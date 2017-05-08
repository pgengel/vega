using Microsoft.AspNetCore.Mvc;
using vega.Models;

namespace vega.Controllers
{
    [Route("/api/vehicle")]
    public class VehicleController : Controller
    {
        [HttpPost]
        public IActionResult CreateVehicle(Vehicle vehicle)
        {
            return Ok(vehicle);
        }
    }
}