namespace PortalProjectAPI.Dtos
{
    public class PagedUsersDto
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public List<UserDto>? Users { get; set; }
    }
}
