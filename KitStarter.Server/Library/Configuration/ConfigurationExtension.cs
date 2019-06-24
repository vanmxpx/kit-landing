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
        }

        public static DefaultConfigProvider GetProvider(this IServiceCollection services)
        {
            return provider;
        }
    }
}