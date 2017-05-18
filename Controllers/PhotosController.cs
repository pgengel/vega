using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using vega.Models;
using vega.Models.Resources;
using vega.Persistence;

namespace vega.Controllers
{
    ///api/vehicle/1/photos
    [Route("/api/vehicle/{vehicleId}/photos")]
    public class PhotosController : Controller
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;
        public PhotosController(IHostingEnvironment host, IMapper mapper, IVehicleRepository vehicleRepository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.vehicleRepository = vehicleRepository;
            this.host = host;

        }

        [HttpPost]
        public async Task<IActionResult> UploadPhoto(int vehicleId, IFormFile file)
        {
            var vehicle = await vehicleRepository.GetVehicle(vehicleId, includeRelated: false);
            if (vehicle == null)
                return NotFound();

            // store the file first in the www root folder wwwroot/upload/image.png
            //To get the path of the folder you need IHostingEnvironment
            var uploadFolderPath = Path.Combine(host.WebRootPath, "uploads");

            //if the folder does exists
            if (!Directory.Exists(uploadFolderPath))
                Directory.CreateDirectory(uploadFolderPath);

            //never trust he file of the user - they could hack the name or upload an exe
            //always genreate a file name
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            //now get the filename into the upload folder 
            var filePath = Path.Combine(uploadFolderPath, fileName);

            //read the file using a stream
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            //update the database
            var photo = new Photo { FileName = fileName };
            vehicle.Photos.Add(photo);
            await unitOfWork.CompleteAsync();

            var photoResource = Mapper.Map<Photo, PhotoResource>(photo);

            return Ok(photoResource);
        }

    }
}