using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Models;
using vega.Models.Resources;

namespace vega.Controllers
{
    [Route("/api/vehicle")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        public VehicleController(IMapper mapper)
        {
            this.mapper = mapper;

        }
        [HttpPost]
        public IActionResult CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            var vehicle = mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            return Ok(vehicle);
        }
    }
}