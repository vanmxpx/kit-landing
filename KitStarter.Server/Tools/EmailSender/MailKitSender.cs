using System;
using System.Net;
using System.Net.Sockets;
using System.Threading.Tasks;
using EASendMail;
using KitStarter.Server.Library.Configuration;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Org.Mentalis.Network.ProxySocket;
using SmtpClient = EASendMail.SmtpClient;

namespace KitStarter.Server.Tools.EmailSender
{
    public class MailKitSender : EmailSender
    {

        public MailKitSender(STMPConnection settings) : base(settings)
        {

        }
        public override async Task SendEmailAsync(string email, string subject, string message)
        {
            SmtpMail oMail = new SmtpMail("TryIt");
            SmtpClient oSmtp = new SmtpClient();

            // Your gmail email address
            oMail.From = new MailAddress(settings.UserName);

            // Set recipient email address
            oMail.To.Add(new MailAddress(email));

            // Set email subject
            oMail.Subject = "test email from gmail account";

            // Set email body
            oMail.TextBody = "this is a test email sent from c# project with gmail.";
            // Gmail SMTP server address
            SmtpServer oServer = new SmtpServer("smtp.gmail.com");

            var host = Dns.GetHostEntry("proxy.isd.dp.ua");
            oServer.SocksProxyServer = host.AddressList[0].ToString();
            oServer.SocksProxyPort = 8080;

            oServer.ProxyProtocol = SocksProxyProtocol.Socks5;

            // Set 465 port
            oServer.Port = 465;

            // detect SSL/TLS automatically
            oServer.ConnectType = SmtpConnectType.ConnectSSLAuto;

            // Gmail user authentication
            // For example: your email is "gmailid@gmail.com", then the user should be the same
            oServer.User = settings.UserName;
            oServer.Password = settings.Password;

            try
            {
                Console.WriteLine("start to send email over SSL ...");
                oSmtp.SendMail(oServer, oMail);
                Console.WriteLine("email was sent successfully!");
            }
            catch (Exception ep)
            {
                Console.WriteLine("failed to send email with the following error:");
                Console.WriteLine(ep.Message);
            }
        }

        public async Task SendEmailAsync2(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress(settings.CompanyName, settings.UserName));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            // string test = Dns.GetHostName();
            // var host = Dns.GetHostEntry("proxy.isd.dp.ua");
            // var proxyIP = host.AddressList[0];
            // int proxyPort = 8080;

            // ProxySocket socket = new ProxySocket(AddressFamily.InterNetwork, SocketType.Stream, ProtocolType.Tcp);
            // socket.ProxyEndPoint = new IPEndPoint(proxyIP, proxyPort);
            // socket.ProxyType = ProxyTypes.Socks5;
            // socket.Connect(settings.Server, settings.Port);

            using(var client = new MailKit.Net.Smtp.SmtpClient())
            {
                // await client.ConnectAsync(socket, settings.Server, settings.Port, SecureSocketOptions.SslOnConnect);
                await client.ConnectAsync(settings.Server, settings.Port, true);
                await client.AuthenticateAsync(settings.UserName, settings.Password);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
            }

        }
    }
}