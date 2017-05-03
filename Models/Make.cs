using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace vega.Models
{
    public class Make
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Model> Models { get; set; }
        //When you have a ICollection in a class, best practice is to initialise it within the class.

        public Make()
        {
            Models = new Collection<Model>();//
        }
    }
}