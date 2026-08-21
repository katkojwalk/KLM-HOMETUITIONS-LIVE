terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.0"
    }
  }

  required_version = ">= 1.5.0"
}

provider "aws" {
  region = "ap-south-2"
}

# Default VPC
data "aws_vpc" "default" {
  default = true
}

# Default subnet
data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# Security Group
resource "aws_security_group" "quadra" {
  name        = "quadra-hometuitions-sg"
  description = "Security group for Quadra Home Tuitions"
  vpc_id      = data.aws_vpc.default.id

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTPS
  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "quadra-hometuitions-sg"
  }
}

# EC2 Instance
resource "aws_instance" "quadra" {
  ami           = "ami-0f918f7e67a3323f0"
  instance_type = "t3.micro"

  key_name = "kk-key"

  subnet_id = data.aws_subnets.default.ids[0]

  vpc_security_group_ids = [
    aws_security_group.quadra.id
  ]

  tags = {
    Name = "quadra-hometuitions"
  }
}

output "instance_id" {
  value = aws_instance.quadra.id
}

output "public_ip" {
  value = aws_instance.quadra.public_ip
}

output "public_dns" {
  value = aws_instance.quadra.public_dns
}