using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Schema;

namespace SMaster2000.Models
{
    public class ScheduleModel
    {
        public int UserID { get; set; }
        public string Title { get; set; }
        public int NumofDays { get; set; }

        public ScheduleModel(int userid, string title, int numofdays)
        {
            UserID = userid;
            Title = title;
            NumofDays = numofdays;
        }

        public ScheduleModel() { }
    }
}
