using System.Threading.Tasks;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;
using MimeKit;

namespace KitStarter.Server.Tools.EmailSender
{
    public class MailKitSender : EmailSender
    {

        public MailKitSender(STMPConnection settings) : base(settings)
        {

        }

        public override async Task SendEmailAsync(CredentialsDTO credentials, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(settings.CompanyName, settings.UserName));
            emailMessage.To.Add(new MailboxAddress(credentials.Name, credentials.Email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using(var client = new MailKit.Net.Smtp.SmtpClient())
            {
                await client.ConnectAsync(settings.Server, settings.Port, true);
                await client.AuthenticateAsync(settings.UserName, settings.Password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }

        }
    }
}