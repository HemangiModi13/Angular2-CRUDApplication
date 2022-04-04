using BAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [RoutePrefix("api/Customer")]
    public class CustomerController : ApiController
    {
        BusinessClass bc;
        public CustomerController()
        {
            bc = new BusinessClass();
        }

        [HttpGet]
        [Route("GetCustomerList")]
        [ResponseType(typeof(List<Model_Customer>))]
        public List<Model_Customer> GetCustomerList()
        {
            List<Model_Customer> List = new List<Model_Customer>();
            try
            {
                List = bc.GetCustomerDetails();
            }
            catch (Exception ex)
            {
            }

            return List;

        }


        [HttpPost]
        [Route("SaveCustomer")]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult SaveCustomer(Model_Customer Modelcustomer,dynamic formData)
        {
            try
            {
                if (bc.SaveCustomer(Modelcustomer))
                {
                    return Content<ActionResponse>(HttpStatusCode.OK, new ActionResponse(Convert.ToInt32(HttpStatusCode.OK), "Customer Save Successfully."));
                }
                else
                {
                    return Content<ClientError>(HttpStatusCode.InternalServerError, new ClientError(Convert.ToInt32(HttpStatusCode.InternalServerError), "Failed to save customer."));
                }
            }
            catch (Exception ex)
            {
                return Content<SystemErrorResponse>(HttpStatusCode.InternalServerError, new SystemErrorResponse(ex.Message, ex.Message, ex.GetType().ToString(), ex.StackTrace.ToString()));
            }
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult UpdateCustomer(Model_Customer Modelcustomer)
        {
            try
            {
                if (bc.UpdateCustomer(Modelcustomer))
                {
                    return Content<ActionResponse>(HttpStatusCode.OK, new ActionResponse(Convert.ToInt32(HttpStatusCode.OK), "Customer Update Successfully."));
                }
                else
                {
                    return Content<ClientError>(HttpStatusCode.InternalServerError, new ClientError(Convert.ToInt32(HttpStatusCode.InternalServerError), "Failed to update customer."));
                }
            }
            catch (Exception ex)
            {
                return Content<SystemErrorResponse>(HttpStatusCode.InternalServerError, new SystemErrorResponse(ex.Message, ex.Message, ex.GetType().ToString(), ex.StackTrace.ToString()));
            }

        }

        [HttpDelete]
        [Route("DeleteCustomer")]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult DeleteCustomer(string ID)
        {
            try
            {
                if (bc.DeleteCustomer(ID))
                {
                    return Content<ActionResponse>(HttpStatusCode.OK, new ActionResponse(Convert.ToInt32(HttpStatusCode.OK), "Customer delete Successfully."));
                }
                else
                {
                    return Content<ClientError>(HttpStatusCode.InternalServerError, new ClientError(Convert.ToInt32(HttpStatusCode.InternalServerError), "Failed to delete customer."));
                }
            }
            catch (Exception ex)
            {
                return Content<SystemErrorResponse>(HttpStatusCode.InternalServerError, new SystemErrorResponse(ex.Message, ex.Message, ex.GetType().ToString(), ex.StackTrace.ToString()));
            }
        }
            
        [HttpGet]
        [Route("GetCountry")]
        [ResponseType(typeof(List<Model_Country>))]
        public IHttpActionResult GetCountry()
        {
            List<Model_Country> List = new List<Model_Country>();
            try
            {
                List = bc.GetCountry();
                return Ok<List<Model_Country>>(List);
            }
            catch (Exception ex)
            {
                return Content<SystemErrorResponse>(HttpStatusCode.InternalServerError, new SystemErrorResponse(ex.Message, ex.Message, ex.GetType().ToString(), ex.StackTrace.ToString()));
            }
        }

        [HttpGet]
        [Route("GetState")]
        [ResponseType(typeof(List<Model_State>))]
        public IHttpActionResult GetState(int CountryID) {

            List<Model_State> List = new List<Model_State>();
            try
            {
                List = bc.GetState(CountryID);
                return Ok<List<Model_State>>(List);
            }
            catch (Exception ex)
            {
                return Content<SystemErrorResponse>(HttpStatusCode.InternalServerError, new SystemErrorResponse(ex.Message, ex.Message, ex.GetType().ToString(), ex.StackTrace.ToString()));
            }
        }


        [HttpGet]
        [Route("GetCity")]
        [ResponseType(typeof(List<Model_State>))]
        public IHttpActionResult GetCity(int StateID)
        {

            List<Model_City> List = new List<Model_City>();
            try
            {
                List = bc.GetCity(StateID);
                return Ok<List<Model_City>>(List);
            }
            catch (Exception ex)
            {
                return Content<SystemErrorResponse>(HttpStatusCode.InternalServerError, new SystemErrorResponse(ex.Message, ex.Message, ex.GetType().ToString(), ex.StackTrace.ToString()));
            }
        }
    }
}
