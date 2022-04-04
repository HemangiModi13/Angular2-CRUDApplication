using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebAPI.Models
{
    public class SystemErrorResponse
    {
        public SystemErrorResponse() { }
        public SystemErrorResponse(string Message = null, string ExceptionMessage = null, string ExceptionType = null, string StackTrace = null)
        {
            this.Message = Message;
            this.ExceptionMessage = ExceptionMessage;
            this.ExceptionType = ExceptionType;
            this.StackTrace = StackTrace;

        }
        //public string StatusCod { get; set; }
        //string StatusCode = null
        public string Message { get; set; }
        public string ExceptionMessage { get; set; }
        public string ExceptionType { get; set; }
        public string StackTrace { get; set; }
    }
}