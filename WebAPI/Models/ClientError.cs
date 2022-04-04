using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class ClientError
    {
        public ClientError()
        {
        }
        public ClientError(int? Code = null, string Message = null)
        {
            this.Code = Code;
            this.Message = Message;
        }

        public int? Code { get; set; }
        public string Message { get; set; }
    }
}