FROM mcr.microsoft.com/dotnet/sdk:8.0

WORKDIR /workspace

RUN useradd -m runner

USER runner

CMD ["dotnet", "run", "--project", "/workspace"]