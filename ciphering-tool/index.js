import { errorHandler } from './utils/error-handler.js';
import { main } from './app/main.js';

await errorHandler(main);
