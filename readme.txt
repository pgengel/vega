Make(BMW), Model(E90) Features(airbags), Ownername, Registered, Photos

Auth

Display a report in a pie chart.

Install DotNetCoreSDK:
https://www.microsoft.com/net/core#windowscmd

Installing Yoeman - the generator used
npm install -g yo generator-aspnetcore-spa

Setting up the project:
    1. yo aspnetcore-spa
    2. dotnet run - build the app and run it on localhost:5000/home
    3. set ASPNETCORE_ENVIRONMENT="Development"
    4. Adding a watch: https://github.com/aspnet/DotNetTools/tree/dev/src/Microsoft.DotNet.Watcher.Tools
        dotnet watch run
    5. dotnet restore

Things to look out for:
    1. Program.cs - Kersner as to WebListner
    2. Startup.cs - DI container is now part of the framework
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddTransient<IRepository, Repository>();
            // Add framework services.
            services.AddMvc();
        }    

         public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
          - in this method it uses middleware  
    3. Dev -> Staging -> Prod
        https://andrewlock.net/how-to-set-the-hosting-environment-in-asp-net-core/
        HMR - Hot module replacement in web browser F12 in Dev phase. Everytime a pice code is update it will be build and replaced.
