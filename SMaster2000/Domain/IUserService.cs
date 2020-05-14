using SMaster2000.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SMaster2000.Domain
{
    public interface IUserService
    {
        public bool Login(string username, string password);
        public void Register(string username, string password, string usertype);
        public bool IsAdmin(string username);

        public int GetUserByName(string userName);
        public List<ScheduleModel> GetScheduleForUser(string username);
        public void CreateSchedule(int userId, string scheduleNumOfDays, string scheduleTitle);

        public List<ScheduleModel> GetAllSchedules();
    }
}