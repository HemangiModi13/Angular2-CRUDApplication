using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class Entities
    {
        Customer_DemoEntities db;
        public Entities()
        {
            db = new Customer_DemoEntities();
        }

        #region Customer

        public List<Customer> GetCustomerList()
        {
            List<Customer> CustomerList = new List<Customer>();
            try
            {
                CustomerList = db.Customers.Select(x => x).ToList();
            }
            catch (Exception ex)
            {
            }

            return CustomerList;
        }

        public bool SaveCustomer(Customer customer)
        {
            try
            {
                //Customer c = new Customer();
                //c.Email = customer.Email;
                //c.FirstName = customer.FirstName;
                //c.LastName = customer.LastName;
                //c.Password = customer.Password;
                //c.PhoneNo = customer.PhoneNo;
               
                db.Customers.Add(customer);
                db.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

            
        }

        public bool UpdateCustomer(Customer customer)
        {
            try
            {
                Customer c = db.Customers.Where(x => x.ID == customer.ID).FirstOrDefault();
                if (c != null)
                {
                    c.Email = customer.Email;
                    c.FirstName = customer.FirstName;
                    c.LastName = customer.LastName;
                    c.Password = customer.Password;
                    c.PhoneNo = customer.PhoneNo;
                    db.SaveChanges();
                    return true;
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            return false;
        }

        public bool DeleteCustomer(string ID)
        {
            string returnValue = "";
            try
            {
                int CID = Convert.ToInt32(ID);
                Customer customer = db.Customers.Where(x => x.ID == CID).FirstOrDefault();
                if (customer != null)
                {
                    db.Customers.Remove(customer);
                    db.SaveChanges();
                    return true;
                }

            }
            catch (Exception ex)
            {
                return false;
            }
            return false;
        }

        #endregion Customer

        #region  Country State City

        public List<Country> GetCountry()
        {
            return db.Countries.ToList();
        }

        public List<State> GetState(int CountryID)
        {
            return db.States.Where(h => h.CountryID == CountryID).ToList();
        }

        public List<City> GetCity(int StateID)
        {
            return db.Cities.Where(h => h.StateID == StateID).ToList();
        }
        #endregion
    }
}
