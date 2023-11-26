using Discounts.Backend.Auth.Core.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Discounts.Backend.Auth.Core.Implementations
{
    public class FileService : IFileService
    {
        public async Task<byte[]> DownloadFileAsync(string url)
        {
            url = Uri.UnescapeDataString(url);
            if (!File.Exists(url))
            {
                throw new Exception("Image not found");
            }

            return await File.ReadAllBytesAsync(url);
        }

        public async Task<string> UploadFileAsync(IFormFile fileData)
        {
            var baseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            var filePath = Path.Combine(baseDirectory, "Resources", fileData.FileName);
            Directory.CreateDirectory(Path.GetDirectoryName(filePath)!);

            using (var stream = File.Create(filePath))
            {
                await fileData.CopyToAsync(stream);
            }

            return filePath;
        }
    }
}
