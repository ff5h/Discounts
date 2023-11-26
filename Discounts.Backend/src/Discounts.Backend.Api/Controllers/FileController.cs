using Discounts.Backend.Auth.Core.Interfaces;
using Discounts.Backend.Dal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http.Headers;

namespace Discounts.Backend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FileController(IFileService fileService)
        {
            _fileService = fileService;
        }


        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            var url = await _fileService.UploadFileAsync(file);
            return Ok(url);
        }

        [HttpGet]
        [Route("{url}")]
        public async Task<IActionResult> Download(string url)
        {
            var imageData = await _fileService.DownloadFileAsync(url);

            string mimeType = GetMimeType(url);

            return File(imageData, mimeType);
        }

        private string GetMimeType(string fileName)
        {
            string extension = Path.GetExtension(fileName)!.ToLowerInvariant();

            switch (extension)
            {
                case ".png":
                    return "image/png";
                case ".jpg":
                case ".jpeg":
                    return "image/jpeg";
                case ".gif":
                    return "image/gif";
                case ".bmp":
                    return "image/bmp";
                default:
                    return "application/octet-stream";
            }
        }
    }
}
