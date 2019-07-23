using System;
using System.Threading;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;
using KitStarter.Server.Services;
using KitStarter.Server.Tools.EmailSender;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KitStarter.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OfferCallController : ControllerBase
    {
        private readonly DefaultConfigProvider provider;
        private readonly ILogger<PurchaseController> _logger;
        private readonly EmailBodyBuilder _messageBuilder;

        private const string MailSubject = "Заказ звонка!";

        public OfferCallController(DefaultConfigProvider provider, ILogger<PurchaseController> logger, EmailBodyBuilder messageBuilder)
        {
            this.provider = provider;
            this._logger = logger;
            this._messageBuilder = messageBuilder;
        }

        [HttpPost]
        public IActionResult ProcessOfferCall(OfferCallDTO offerCallInfo)
        {
            _logger.LogInformation($"Offer Call: {offerCallInfo.ToString()}");
            EmailSender emailService = new MailKitSender(provider.STMPConnection);

            string mailBodyInretnal = $"Заказ звонка\n\rИмя: {offerCallInfo.Name}\n\rНомер: {offerCallInfo.PhoneNumber}";
            var taskInretnal = emailService.SendEmailAsync(
                new CredentialsDTO { Email = provider.STMPConnection.UserName, Name = provider.STMPConnection.CompanyName },
                MailSubject, mailBodyInretnal);
            var ctsInretnal = new CancellationTokenSource();
            try
            {
                _logger.LogInformation($"Sending OfferMail to MANAGER. {provider.STMPConnection.UserName}");
                ctsInretnal.CancelAfter(provider.STMPConnection.TimeOut);
                taskInretnal.Wait(ctsInretnal.Token);
                _logger.LogInformation($"OfferMail sended to MANAGER. {provider.STMPConnection.UserName}");
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, $"OfferMail Sending to MANAGER Timeout Exception. Connection problem. \nPURCHASE: {offerCallInfo.ToString()}");
                return NotFound("TimeoutException. " + ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"OfferMail Sending to MANAGER Exception. Something went wrong. \nPURCHASE: {offerCallInfo.ToString()}");
                return NotFound("Request exception. " + ex.Message);
            }

            return Ok();
        }
    }
}