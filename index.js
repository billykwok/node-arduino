import SerialPort from 'serialport';
import readline from 'readline';

const STEP = 20;
const rgb = [0, 0, 0];

(async () => {
  // Scan for any Arduino device.
  const entries = await SerialPort.list();
  const entry = entries.find(
    ({ manufacturer }) => manufacturer && manufacturer.includes('Arduino')
  );
  if (!entry) {
    console.warn('Host | No Arduino found');
    return process.exit(1);
  }
  console.info(`Host | Connecting to ${entry.path}...`);

  // Automatically connect to the first found Arduino.
  const port = new SerialPort(entry.path, { baudRate: 9600 });

  // Pipe its output to a line-delimited parser.
  const parser = port.pipe(
    new SerialPort.parsers.Readline({ delimiter: '\r\n', encoding: 'ascii' })
  );

  // Wait for Arduino to send the READY signal before sending anything to it.
  // Otherwise it may miss some of our initial messages.
  await new Promise((resolve) => {
    parser.addListener('data', (data) => {
      console.info(`Arduino | ${data}`);
      if (data === 'READY') {
        resolve(undefined);
      }
    });
  });
  console.info('Host | Device is now ready for serial communication');

  // Register keypress event from raw standard input.
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  // Listen to the key presses, update the rgb value and send it to Arduino.
  process.stdin.on('keypress', (char, key) => {
    if (key.ctrl && key.name === 'c') {
      return process.exit(0);
    }
    console.log(`Host | Pressed ${char}`);
    switch (char) {
      case 'r':
        rgb[0] = (rgb[0] + STEP) % 256;
        break;
      case 'g':
        rgb[1] = (rgb[1] + STEP) % 256;
        break;
      case 'b':
        rgb[2] = (rgb[2] + STEP) % 256;
        break;
    }
    port.write(Buffer.from(Uint8ClampedArray.of(...rgb, 0x0a)));
  });
})();
