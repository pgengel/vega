Make(BMW), Model(E90) Features(airbags), Ownername, Registered, Photos

Auth

Display a report in a pie chart.

Install DotNetCoreSDK:
https://www.microsoft.com/net/core#windowscmd

Installing Yoeman - the generator used
npm install -g yo generator-aspnetcore-spa

Getting Started
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

Building APIs Using ASP.NET Core

    Building domain model
        public ICollection<Model> Models { get; set; }
        //When you have a ICollection in a class, best practice is to initialise it within the class.
       
        public Make Make { get; set; }
        public int MakeId { get; set; }// Foreign key property. EF will not that this and the line above is related.
        An extra column will not be made.

    Adding EF    
        dotnet add package Microsoft.EntityFrameWorkCore.SqlServer
        dotnet restore
        Anytime that you want to add command line tools, you need to add them in the .csproj files.
          <ItemGroup>
                <DotNetCliToolReference Include="Microsoft.EntityFrameWorkCore.Tools.DotNet" Version="1.0.0" />
          </ItemGroup>
          dotnet ef 
          dotnet ef migrations --help
          dotnet ef migrations add --help
    Creating a DB Context
        DbContextOptions - new class which is  generic, we need to register this as a service
        var context = new VegaDbContext(); -- This is bad and tightly couples the code.

        in Startup.cs
            using Microsoft.EntityFrameworkCore;
            services.AddDbContext<VegaDbContext>(options => options.UseSqlServer("connection string"));

        Creating a DB
            dotnet add package Microsoft.EntityFrameworkCore.Design
            dotnet ef migrations add InitialModel
            dotnet ef database update
            
            There will be nothing in the migrations file because there is nothing in the db context.
            Thus, in VegaDbContext add public DbSet<Make> Makes {get;set}
            The make class knows about the model class because it is like a foreign key, thus we do not need to list this as well in the db context class.

            to remove the last migrations
            dotnet ef migrations remove

            Self referencing errors - need to seperate the models from the db and the models from the API.
                use automapper - dotnet add package automapper and dotnet add package automapper.extensions.microsoft.dependencyinjection --version 1.2.0 
                Then in the startup.cs - services.AddAutoMapper(); 
            Make API
                install Postman
                and JSONView - google ext


Building forms with angular and bootstrap
    creating components easliy
    npm install @angular/cli@latest -g

    ng new hello-world then move the .angular-cli-json to the root vega.
    npm install @angular/cli@latest --save-dev
    go to the component folder cd ClientApp and ng g component vehicle-form

    form>div.form-group>label+select


Implementing CRUD Operations
Domain Models 
 Make->Model 
 1    n

 Feature<-Vehicle This is a many-to-many relationship, we need to add a mapping class VehicleFeature
 n       n   

 Feature<-VehicleFeature->Vehicle
 1          n       n       1  going to use a composite primary key.

 Vehicle->Model
 n          1

 in Vehicle model add property VehicleFeature and init it in ctor
 public ICollection<VehicleFeatures> Features
 ctor
    Features = new Collection<VehicleFeature>
Then in DBContext you need to override a method.

When using complex object we need to tell .net that where to init this object that it is reeiving

        public IActionResult CreateVehicle([FromBody] Vehicle vehicle) - use from FromBody
it means that the data of the request is not the model in the models class but in the body of the request.

Repository
    it is a collection of objects in memory, thus put Add, Remove, Update, Read methods. Do not add SaveChanges



Cannot use [(ngModel)]="vehicle.features" because check boxes have dynimick field. - > (change)="onFeatureToggle(f.id, $event
to submit a form you need to supply a ng submit form directiveto <form (ngSubmit)="submit()">
There is a control object in angular that tracks what html components have been touched, dirty changed etc
on the form you use ngForm, and on the  input you use ngModel
    
    

