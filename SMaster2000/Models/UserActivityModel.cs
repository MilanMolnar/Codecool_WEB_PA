using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMaster2000.Models
{
    public class UserActivityModel
    {
        public int UserID { get; set; }
        public string Activity { get; set; }

        public UserActivityModel() { }

        public UserActivityModel(int userid, string activity)
        {
            UserID = userid;
            Activity = activity;
        }
    }
}
