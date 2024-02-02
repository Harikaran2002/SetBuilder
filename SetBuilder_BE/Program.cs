using Microsoft.EntityFrameworkCore;
using SetBuilder_BE.Model;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<DWContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DW")));

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          var uiDomain = builder.Configuration.GetConnectionString("UI_Domain");
                          if (uiDomain != null)
                          {
                              policy.WithOrigins(uiDomain).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                          }
                          else
                          {
                              throw new InvalidOperationException("UI_Domain is not configured correctly.");
                          }
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
