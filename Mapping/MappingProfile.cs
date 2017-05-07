using AutoMapper;
using vega.Models;
using vega.Models.Resources;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
        }
        
    }
}