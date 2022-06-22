using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebAPI.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Web;

namespace WebAPI.Controllers
{
    public class EmployeeController : ApiController
    {
    

            public HttpResponseMessage Get()
            {
            //convert(varchar10), DateOfJoining,120) as DateOfJoining, PhotoFilename 
                string query = @"
                select EmployeeId, EmployeeName, Department, convert(varchar(10), DateOfJoining,120) as DateOfJoining, PhotoFilename from
                dbo.Employee
                ";
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))

                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return Request.CreateResponse(HttpStatusCode.OK, table);

        }


            public string Post(Employee dep)
            {
                try
                {
                    string query = @"
                                insert into dbo.Employee values
                                (
                                '" + dep.EmployeeName + 
                                @"','" + dep.Department + @"'
                                ,'" + dep.DateOfJoining + @"'
                                ,'" + dep.PhotoFileName + @"'
                                )
                                ";
                System.Diagnostics.Debug.Write("**************************************");
                System.Diagnostics.Debug.Write(" + dep.EmployeeName + @");
                    DataTable table = new DataTable();
                    using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                    using (var cmd = new SqlCommand(query, con))

                    using (var da = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandType = CommandType.Text;
                        da.Fill(table);
                    }

                    return "Added Successfully";
                }

                catch (Exception)
                {

                    return "FAILED TO ADD";
                }
            }


            public string Put(Employee emp)
            {
                try
                {
                    string query = @"
                                update dbo.Employee set 
                                EmployeeName='" + emp.EmployeeName + @"'
                                ,Department='"+emp.Department + @"'
                                ,DateOfJoining='" + emp.DateOfJoining + @"'
                                ,PhotoFileName='" + emp.PhotoFileName + @"'
                                where EmployeeId=" + emp.EmployeeId + @"
                                ";
                    DataTable table = new DataTable();
                    using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                    using (var cmd = new SqlCommand(query, con))

                    using (var da = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandType = CommandType.Text;
                        da.Fill(table);
                    }

                    return "Update Successfully";
                }

                catch (Exception)
                {

                    return "FAILED TO Update";
                }
            }


            public string Delete(int id)
            {
                try
                {
                    string query = @"
                                delete from dbo.Employee
                                where EmployeeId=" + id + @"
                                ";
                    DataTable table = new DataTable();
                    using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                    using (var cmd = new SqlCommand(query, con))

                    using (var da = new SqlDataAdapter(cmd))
                    {
                        cmd.CommandType = CommandType.Text;
                        da.Fill(table);
                    }

                    return "Delete Successfully";
                }

                catch (Exception)
                {

                    return "FAILED TO DELETE";
                }
            }

            //自定义方法，需要映射的路由
            [Route("api/Employee/GetAllDepartmentNames")]
            [HttpGet]
            public HttpResponseMessage GetAllDepartmentNames()
            {
                string query = @"
                select DepartmentName from dbo.Department";
             
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeeAppDb"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))

                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                return Request.CreateResponse(HttpStatusCode.OK, table);
            }

            [Route("api/Employee/SaveFile")]
            [HttpPost]   
            public string SvaeFile()
            {
                try
                {
                    var httpRequest = HttpContext.Current.Request;
                    var postedFile = httpRequest.Files[0];
                    string filename = postedFile.FileName;
                    var phytsicalPath = HttpContext.Current.Server.MapPath("~/Photos/" + filename);

                    postedFile.SaveAs(phytsicalPath);
                    return filename;
                }

                catch(Exception)
                    {
                    return "anonymous.png";
                }
            }


        
    }
}