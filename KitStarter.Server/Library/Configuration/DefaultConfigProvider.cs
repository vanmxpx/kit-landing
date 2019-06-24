using KitStarter.Server.Library.Configuration.LoggingConfiguration;

namespace KitStarter.Server.Library.Configuration
{
    public class DefaultConfigProvider
    {
        private ConnectionStrings connectionString;
        private Logging logging;
        private STMPConnection stmpConnection;
        private AppSettings appSettings;
        public ConnectionStrings ConnectionStrings
        {
            get
            {
                return connectionString;
            }
            set
            {
                connectionString = value;
            }
        }
        public Logging Logging
        {
            get
            {
                return logging;
            }
            set
            {
                logging = value;
            }
        }
        public STMPConnection STMPConnection
        {
            get
            {
                return stmpConnection;
            }
            set
            {
                stmpConnection = value;
            }
        }
        public AppSettings AppSettings
        {
            get
            {
                return appSettings;
            }
            set
            {
                appSettings = value;
            }
        }
    }
}