using Microsoft.AspNetCore.Mvc;
using NetCoreLogin.Models;

namespace NetCoreLogin.Controllers
{
    public class APIController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("api/login")]
        public ActionResult Index(string email, string password)
        {
            if (email == "test@test.com" && password == "123456789")
            {
                return Json(new { success = true, message = "ok", redirectUrl = Url.Action("Index", "Home") });
            }
            else if (email != "test@test.com")
            {
                return Json(new { success = false, message = "invalid email" });
            }
            else if(password != "123456789")
            {
                return Json(new { success = false, message = "invalid password" });
            }
            else
            {
                return Json(new { success = false, message = "invalid login" });
            }
        }
    }
}
