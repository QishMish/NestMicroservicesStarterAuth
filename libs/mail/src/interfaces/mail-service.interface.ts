import { MailOptions } from '@app/types';

interface MailServiceInterface {
  send(options: MailOptions): void;
}

export { MailServiceInterface };
