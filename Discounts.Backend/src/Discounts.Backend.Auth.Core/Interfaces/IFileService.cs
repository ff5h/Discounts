using Microsoft.AspNetCore.Http;

namespace Discounts.Backend.Auth.Core.Interfaces
{
    public interface IFileService
    {
        public Task<string> UploadFileAsync(IFormFile fileData);

        public Task<byte[]> DownloadFileAsync(string url);
    }
}
