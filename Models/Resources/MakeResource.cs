using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Models.Resources
{
    public class MakeResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ModelResource> Models { get; set; }
        //When you have a ICollection in a class, best practice is to initialise it within the class.

        public MakeResource()
        {
            Models = new Collection<ModelResource>();//
        }
    }
}