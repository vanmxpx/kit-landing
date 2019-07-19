using System.Threading.Tasks;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;

namespace KitStarter.Server.Tools.EmailSender
{
    public abstract class EmailSender
    {
        protected STMPConnection settings;
        public EmailSender(STMPConnection settings)
        {
            this.settings = settings;
        }
        public abstract Task SendEmailAsync(CredentialsDTO credentials, string subject, string message);
    }
}