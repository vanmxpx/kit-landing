using KitStarter.Server.Library.Configuration.LoggingConfiguration;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KitStarter.Server.Library.Configuration
{
    public class DefaultConfigLoader
    {
        public void ConfigProvider(IServiceCollection services, DefaultConfigProvider provider)
        {
            SetConfiguration<ConnectionStrings>(services, provider.ConnectionStrings);
            SetConfiguration<STMPConnection>(services, provider.STMPConnection);
        }

        public DefaultConfigProvider GetConfigProvider(IConfiguration config)
        {
            DefaultConfigProvider configProvider = new DefaultConfigProvider()
            {
                ConnectionStrings = GetConfiguration<ConnectionStrings>(config, "ConnectionStrings"),
                Logging = GetConfiguration<Logging>(config, "Logging"),
                STMPConnection = GetConfiguration<STMPConnection>(config, "STMPConnection"),
                AppSettings = GetConfiguration<AppSettings>(config, "AppSettings")
            };
            return configProvider;
        }

        private T GetConfiguration<T>(IConfiguration config, string Path) where T : class
        {
            return config.GetSection(Path).Get<T>();
        }
        private void SetConfiguration<T>(IServiceCollection services, T config) where T : class
        {
            services.AddSingleton(config);
        }

    }
}