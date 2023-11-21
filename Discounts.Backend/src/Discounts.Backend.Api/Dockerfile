#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

#Depending on the operating system of the host machines(s) that will build or run the containers, the image specified in the FROM statement may need to be changed.
#For more information, please see https://aka.ms/containercompat

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["src/Discounts.Backend.Api/Discounts.Backend.Api.csproj", "src/Discounts.Backend.Api/"]
COPY ["src/Discounts.Backend.Auth.Core/Discounts.Backend.Auth.Core.csproj", "src/Discounts.Backend.Auth.Core/"]
COPY ["src/Discounts.Backend.Dal/Discounts.Backend.Dal.csproj", "src/Discounts.Backend.Dal/"]
COPY ["src/Discounts.Backend.Auth.Services/Discounts.Backend.Auth.Services.csproj", "src/Discounts.Backend.Auth.Services/"]
RUN dotnet restore "src/Discounts.Backend.Api/Discounts.Backend.Api.csproj"
COPY . .
WORKDIR "/src/src/Discounts.Backend.Api"
RUN dotnet build "Discounts.Backend.Api.csproj" -c Development -o /app/build

FROM build AS publish
RUN dotnet publish "Discounts.Backend.Api.csproj" -c Development -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Discounts.Backend.Api.dll"]