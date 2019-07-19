using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;
using KitStarter.Server.Services;
using KitStarter.Server.Tools.EmailSender;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MimeKit;

namespace KitStarter.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        private readonly DefaultConfigProvider provider;
        private readonly ILogger<PurchaseController> _logger;
        private readonly EmailBodyBuilder _messageBuilder;

        private const string MailSubject = "Покупка совершена!";

        public PurchaseController(DefaultConfigProvider provider, ILogger<PurchaseController> logger, EmailBodyBuilder messageBuilder)
        {
            this.provider = provider;
            this._logger = logger;
            this._messageBuilder = messageBuilder;
        }

        [HttpPost]
        public IActionResult ProcessPurchase(PurchaseDTO purchase)
        {
            _logger.LogInformation($"Purchase mail: {purchase.ToString()}");
            EmailSender emailService = new MailKitSender(provider.STMPConnection);

            string mailBodyInretnal = _messageBuilder.Create(EmailType.Internal, purchase);
            var taskInretnal = emailService.SendEmailAsync(
                new CredentialsDTO { Email = provider.STMPConnection.UserName, Name = provider.STMPConnection.CompanyName },
                MailSubject, mailBodyInretnal);
            var ctsInretnal = new CancellationTokenSource();
            try
            {
                _logger.LogInformation($"Sending mail to MANAGER. {purchase.Credentials.Email}");
                ctsInretnal.CancelAfter(provider.STMPConnection.TimeOut);
                taskInretnal.Wait(ctsInretnal.Token);
                _logger.LogInformation($"Mail sended to MANAGER. {purchase.Credentials.Email}");
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, $"Mail Sending to MANAGER Timeout Exception. Connection problem. \nPURCHASE: {purchase.ToString()}");
                return NotFound("TimeoutException. " + ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Mail Sending to MANAGER Exception. Something went wrong. \nPURCHASE: {purchase.ToString()}");
                return NotFound("Request exception. " + ex.Message);
            }

            if (string.IsNullOrEmpty(purchase.Credentials.Email))
            { 
                return Ok();
            }

            string mailBodyExternal = _messageBuilder.Create(EmailType.External, purchase);
            var taskExternal = emailService.SendEmailAsync(purchase.Credentials, MailSubject, mailBodyExternal);
            var ctsExternal = new CancellationTokenSource();
            try
            {
                _logger.LogInformation($"Sending mail to USER. {purchase.Credentials.Email}");
                ctsExternal.CancelAfter(provider.STMPConnection.TimeOut);
                taskExternal.Wait(ctsExternal.Token);
                _logger.LogInformation($"Mail sended to USER. {purchase.Credentials.Email}");
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, $"Mail Sending to USER Timeout Exception. Connection problem. \nPURCHASE: {purchase.ToString()}");
                return NotFound("TimeoutException. " + ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Mail Sending to USER Exception. Something went wrong. \nPURCHASE: {purchase.ToString()}");
                return NotFound("Request exception. " + ex.Message);
            }

            return Ok();
        }
    }
}