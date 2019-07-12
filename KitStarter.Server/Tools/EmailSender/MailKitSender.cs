using System.Threading.Tasks;
using KitStarter.Server.Library.Configuration;
using MimeKit;

namespace KitStarter.Server.Tools.EmailSender
{
    public class MailKitSender : EmailSender
    {

        public MailKitSender(STMPConnection settings) : base(settings)
        {

        }

        public override async Task SendEmailAsync(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(settings.CompanyName, settings.UserName));
            emailMessage.To.Add(new MailboxAddress("", email));
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