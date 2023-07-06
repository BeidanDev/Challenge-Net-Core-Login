using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace NetCoreLogin.Models
{
    public class LoginViewModel
    {
        //[Required(ErrorMessage = "El campo {0} es requerido")]
        //[EmailAddress(ErrorMessage = "El campo debe ser un correo electrónico válido")]
        public string Email { get; set; }

        //[Required(ErrorMessage = "El campo {0} es requerido")]
        //[DataType(DataType.Password)]
        public string Password { get; set; }

        public string ErrorMessage { get; set; } = "";
    }
}
