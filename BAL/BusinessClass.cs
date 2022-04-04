using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Model;

namespace BAL
{
    public class BusinessClass
    {
        Entities e;
        public BusinessClass()
        {
            e = new Entities();
        }

        #region Customer 

        public List<Model_Customer> GetCustomerDetails()
        {
            List<Model_Customer> CustomerList = new List<Model_Customer>();
            try
            {
                List<Customer> List = e.GetCustomerList();
                CustomerList = List.Select(x => new Model_Customer
                {
                    Email = x.Email,
                    FirstName = x.FirstName,
                    ID = x.ID,
                    LastName = x.LastName,
                    Password = x.Password,
                    PhoneNo = x.PhoneNo,
                    CountryID = (int)x.CountryID,
                    StateID = (int)x.StateID,
                    CityID = (int)x.CityID
                }).ToList();

            }
            catch (Exception ex)
            {
            }

            return CustomerList;
        }

        public bool SaveCustomer(Model_Customer modelCustomer)
        {
            Customer c = new Customer();
            c.Email = modelCustomer.Email;
            c.FirstName = modelCustomer.FirstName;
            c.LastName = modelCustomer.LastName;
            c.Password = modelCustomer.Password;
            c.PhoneNo = modelCustomer.PhoneNo;
            c.CountryID = modelCustomer.CountryID;
            c.StateID = modelCustomer.StateID;
            c.CityID = modelCustomer.CityID;
            c.Image = modelCustomer.Image;
            return e.SaveCustomer(c);
        }

        public bool UpdateCustomer(Model_Customer modelCustomer)
        {
            Customer c = new Customer();
            c.ID = modelCustomer.ID;
            c.Email = modelCustomer.Email;
            c.FirstName = modelCustomer.FirstName;
            c.LastName = modelCustomer.LastName;
            c.Password = modelCustomer.Password;
            c.PhoneNo = modelCustomer.PhoneNo;
            return e.UpdateCustomer(c);
        }

        public bool DeleteCustomer(string ID)
        {
            return e.DeleteCustomer(ID);
        }

        #endregion Customer 

        #region Country State City

        public List<Model_Country> GetCountry()
        {

            List<Model_Country> lstCountry = new List<Model_Country>();
            var country = e.GetCountry();
            foreach (var item in country)
            {
                lstCountry.Add(new Model_Country()
                {
                    CountryID = item.CountryID,
                    CountryName = item.CountryName
                });
            }
            return lstCountry;
        }

        public List<Model_State> GetState(int CountryID)
        {
            List<Model_State> lstState = new List<Model_State>();
            var state = e.GetState(CountryID);
            foreach (var item in state)
            {
                lstState.Add(new Model_State()
                {
                    StateID = item.StateID,
                    StateName = item.StateName,
                    CountryID = (int)item.CountryID

                });
            }
            return lstState;
        }


        public List<Model_City> GetCity(int StateID)
        {
            List<Model_City> lstCity = new List<Model_City>();
            var city = e.GetCity(StateID);
            foreach (var item in city)
            {
                lstCity.Add(new Model_City()
                {
                    CityID = item.CityID,
                    StateID = (int)item.StateID,
                    CityName = item.CityName
                });
            }
            return lstCity;
        }
        #endregion
    }
}

