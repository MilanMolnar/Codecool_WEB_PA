using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Schema;

namespace NewsMaster3000.Models
{
    public class NewsModel
    {
        public int UserID { get; set; }
        public int NewsID { get; set; }
        public string NewsTitle { get; set; }
        public string NewsContent { get; set; }
        public string NewsAuthor { get; set; }
        public string NewsPublishedDate { get; set; }
        public NewsModel(int userid, int news_id, string news_title, string news_content, string news_author, string news_published_date)
        {
            UserID = userid;
            NewsID = news_id;
            NewsTitle = news_title;
            NewsContent = news_content;
            NewsAuthor = news_author;
            NewsPublishedDate = news_published_date;
        }

        public NewsModel() { }
    }
}