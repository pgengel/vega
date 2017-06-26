using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Persistence
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int vehicleId);
    }
}