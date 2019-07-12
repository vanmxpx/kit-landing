using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using KitStarter.Server.Library.Configuration;
using KitStarter.Server.Models;
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

        public PurchaseController(DefaultConfigProvider provider, ILogger<PurchaseController> logger)
        {
            this.provider = provider;
            this._logger = logger;
        }

        [HttpPost]
        public IActionResult ProcessPurchase(PurchaseDTO purchase)
        {
            _logger.LogInformation($"Purchase mail: {purchase}");
            EmailSender emailService = new MailKitSender(provider.STMPConnection);
            int timeout = provider.STMPConnection.TimeOut;
            var task = emailService.SendEmailAsync(purchase.Email, "Покупка совершена", purchase.Products);

            var cts = new CancellationTokenSource();

            try
            {
                // ***Set up the CancellationTokenSource to cancel after 2.5 seconds. (You
                // can adjust the time.)
                _logger.LogInformation("Sending mail.");
                cts.CancelAfter(timeout);
                task.Wait();
                _logger.LogInformation("Mail Sended. ");
            }
            catch (OperationCanceledException ex)
            {
                _logger.LogError(ex, "Mail Sending Timeout Exception. Something wrong with connection.");
                return NotFound("TimeoutException. " + ex.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Mail Sending Exception. Something wrong went wrong.");
                return NotFound("Request exception. " + ex.Message);
            }

            var task2 = emailService.SendEmailAsync(provider.STMPConnection.UserName, "Покупка совершена", purchase.Products);
            var cts2 = new CancellationTokenSource();

            try
            {
                // ***Set up the CancellationTokenSource to cancel after 2.5 seconds. (You
                // can adjust the time.)
                cts2.CancelAfter(timeout);
                task2.Wait(cts2.Token);
            }
            catch (OperationCanceledException ex)
            {
                return NotFound("TimeoutException. " + ex.Message);
            }
            catch (Exception ex)
            {
                return NotFound("Request exception. " + ex.Message);
            }

            cts = null;
            return Ok();
        }
    }
}