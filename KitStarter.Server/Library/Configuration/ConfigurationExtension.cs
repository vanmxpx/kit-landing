using KitStarter.Server.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KitStarter.Server.Library.Configuration
{
    public static class ConfigurationExtension
    {
        private static DefaultConfigProvider provider { get; set; }
        public static void AddConfigurationProvider(this IServiceCollection services, IConfiguration config)
        {
            DefaultConfigLoader loader = new DefaultConfigLoader();
            provider = loader.GetConfigProvider(config);
            services.AddSingleton<DefaultConfigProvider>(provider);
            services.AddSingleton<EmailBodyBuilder>();
        }

        public static DefaultConfigProvider GetProvider(this IServiceCollection services)
        {
            return provider;
        }
    }
}