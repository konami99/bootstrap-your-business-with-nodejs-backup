export default class EmailService {
  constructor(private emailProvider: EmailProviderInterface) {

  }

  async send(email: string) {
    this.emailProvider.send(email);
  }
}
