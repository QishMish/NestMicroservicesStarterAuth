interface MailOptions {
  from?: string;
  sender?: string;
  to: string;
  subject?: string | undefined;
  text?: string | undefined;
  html?: string | undefined;
  priority?: 'high' | 'normal' | 'low' | undefined;
}

export { MailOptions };
