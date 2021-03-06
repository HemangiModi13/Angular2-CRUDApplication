using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class ActionResponse
    {
        public ActionResponse()
        {
        }
        public ActionResponse(int? Code = null, string Message = null)
        {
            this.Code = Code;
            this.Message = Message;
        }
        public int? Code { get; set; }
        public string Message { get; set; }
    }
}