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
            int timeout = provider.STMPConnection.TimeOut;

            var task = emailService.SendEmailAsync(purchase.Credentials, "Покупка совершена", purchase.Products);

            var cts = new CancellationTokenSource();

            try
            {
                _logger.LogInformation($"Sending mail to USER. {purchase.Credentials.Email}");
                cts.CancelAfter(timeout);
                task.Wait(cts.Token);
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

            // var task2 = emailService.SendEmailAsync(provider.STMPConnection.UserName, "Покупка совершена", purchase.Products);
            // var cts2 = new CancellationTokenSource();

            // try
            // {
            //     // ***Set up the CancellationTokenSource to cancel after 2.5 seconds. (You
            //     // can adjust the time.)
            //     cts2.CancelAfter(timeout);
            //     task2.Wait(cts2.Token);
            // }
            // catch (OperationCanceledException ex)
            // {
            //     return NotFound("TimeoutException. " + ex.Message);
            // }
            // catch (Exception ex)
            // {
            //     return NotFound("Request exception. " + ex.Message);
            // }

            cts = null;
            return Ok();
        }
    }
}