using System.Threading.Tasks;
using KitStarter.Server.Library.Configuration;

namespace KitStarter.Server.Tools.EmailSender
{
    public abstract class EmailSender
    {
        protected STMPConnection settings;
        public EmailSender(STMPConnection settings)
        {
            this.settings = settings;
        }
        public abstract Task SendEmailAsync(string email, string subject, string message);
    }
}