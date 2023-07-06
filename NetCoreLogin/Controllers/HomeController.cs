using Microsoft.AspNetCore.Mvc;

namespace NetCoreLogin.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
