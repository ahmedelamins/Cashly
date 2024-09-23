﻿// <auto-generated />
using System;
using Cashly.Server.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Cashly.Server.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240923060013_SeedingExpensesMigration")]
    partial class SeedingExpensesMigration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Cashly.Server.Models.Category", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Categories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Utility"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Food"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Fun"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Shopping"
                        },
                        new
                        {
                            Id = 5,
                            Name = "Other"
                        });
                });

            modelBuilder.Entity("Cashly.Server.Models.Expense", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<decimal>("Amount")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("Expenses");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 1200.00m,
                            CategoryId = 1,
                            CreatedAt = new DateTime(2024, 9, 3, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Rent",
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            Amount = 120.50m,
                            CategoryId = 1,
                            CreatedAt = new DateTime(2023, 9, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Electric Bill",
                            UserId = 1
                        },
                        new
                        {
                            Id = 3,
                            Amount = 80.99m,
                            CategoryId = 2,
                            CreatedAt = new DateTime(2023, 9, 7, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Groceries",
                            UserId = 1
                        },
                        new
                        {
                            Id = 4,
                            Amount = 24.57m,
                            CategoryId = 2,
                            CreatedAt = new DateTime(2023, 9, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Lunch",
                            UserId = 1
                        },
                        new
                        {
                            Id = 5,
                            Amount = 70.00m,
                            CategoryId = 4,
                            CreatedAt = new DateTime(2023, 9, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "New Shoes",
                            UserId = 1
                        },
                        new
                        {
                            Id = 6,
                            Amount = 45.00m,
                            CategoryId = 3,
                            CreatedAt = new DateTime(2023, 8, 11, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Concert Ticket",
                            UserId = 1
                        },
                        new
                        {
                            Id = 7,
                            Amount = 25.75m,
                            CategoryId = 5,
                            CreatedAt = new DateTime(2023, 9, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Charity",
                            UserId = 1
                        },
                        new
                        {
                            Id = 8,
                            Amount = 45.00m,
                            CategoryId = 5,
                            CreatedAt = new DateTime(2023, 8, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Fix phone",
                            UserId = 1
                        },
                        new
                        {
                            Id = 9,
                            Amount = 45.00m,
                            CategoryId = 4,
                            CreatedAt = new DateTime(2023, 8, 22, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "New shirt",
                            UserId = 2009
                        },
                        new
                        {
                            Id = 10,
                            Amount = 60.00m,
                            CategoryId = 5,
                            CreatedAt = new DateTime(2023, 8, 23, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Title = "Date",
                            UserId = 2009
                        });
                });

            modelBuilder.Entity("Cashly.Server.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<byte[]>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("Cashly.Server.Models.Expense", b =>
                {
                    b.HasOne("Cashly.Server.Models.Category", "Category")
                        .WithMany("Expenses")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Cashly.Server.Models.User", "User")
                        .WithMany("Expenses")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("User");
                });

            modelBuilder.Entity("Cashly.Server.Models.Category", b =>
                {
                    b.Navigation("Expenses");
                });

            modelBuilder.Entity("Cashly.Server.Models.User", b =>
                {
                    b.Navigation("Expenses");
                });
#pragma warning restore 612, 618
        }
    }
}
