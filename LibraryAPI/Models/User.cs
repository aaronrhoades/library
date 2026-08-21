using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace LibraryAPI.Models;

public class User : IdentityUser<Guid>
{
    [JsonIgnore]
    public List<Book> books {get;set;} = new List<Book>();
}