const prisma = require('../config/database');

const getStockStatistics = async (req, res) => {
  try {
    // Total stok produk
    const totalStock = await prisma.product.aggregate({
      _sum: { stock: true },
    });

    // Produk dengan stok tertinggi
    const highestStockProduct = await prisma.product.findFirst({
      orderBy: { stock: 'desc' },
      include: { category: true }, // Menyertakan data kategori
    });

    // Produk dengan stok terendah
    const lowestStockProduct = await prisma.product.findFirst({
      orderBy: { stock: 'asc' },
      include: { category: true }, // Menyertakan data kategori
    });

    // Distribusi kategori (tanpa `include`, hanya `categoryId` dan `_sum.stock`)
    const categoryDistributionRaw = await prisma.product.groupBy({
      by: ['categoryId'],
      _sum: { stock: true },
    });

    // Query tambahan untuk mendapatkan data kategori berdasarkan `categoryId`
    const categoryIds = categoryDistributionRaw.map((item) => item.categoryId);
    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds } },
    });

    // Menggabungkan data distribusi kategori dengan nama kategori
    const categoryDistribution = categoryDistributionRaw.map((item) => {
      const category = categories.find((cat) => cat.id === item.categoryId);
      return {
        categoryId: item.categoryId,
        categoryName: category?.name || 'Unknown', // Menambahkan nama kategori
        totalStock: item._sum.stock || 0,
      };
    });

    // Mengembalikan data ke klien
    res.status(200).json({
      totalStock: totalStock._sum.stock || 0,
      highestStockProduct,
      lowestStockProduct,
      categoryDistribution,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch stock statistics' });
  }
};

const getTransactionStatistics = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Total penjualan
    const totalSales = await prisma.transaction.aggregate({
      _sum: { totalAmount: true },
      where: { trxType: 'out', date: { gte: new Date(startDate), lte: new Date(endDate) } },
    });

    // Total pembelian
    const totalPurchases = await prisma.transaction.aggregate({
      _sum: { totalAmount: true },
      where: { trxType: 'in', date: { gte: new Date(startDate), lte: new Date(endDate) } },
    });

    // Produk terlaris
    const bestSellingProduct = await prisma.detailTrx.groupBy({
      by: ['productId'],
      _sum: { qty: true },
      orderBy: { _sum: { qty: 'desc' } },
      take: 1,
    });

    // Nama produk terlaris
    const productDetails = bestSellingProduct[0]
      ? await prisma.product.findUnique({ where: { id: bestSellingProduct[0].productId } })
      : null;

    res.status(200).json({
      totalSales: totalSales._sum.totalAmount || 0,
      totalPurchases: totalPurchases._sum.totalAmount || 0,
      bestSellingProduct: productDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch transaction statistics' });
  }
};

const getFinancialStatistics = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Total pendapatan
    const totalIncome = await prisma.detailTrx.aggregate({
      _sum: { totalPrice: true },
      where: {
        transaction: { trxType: 'out', date: { gte: new Date(startDate), lte: new Date(endDate) } },
      },
    });

    // Total pengeluaran
    const totalExpense = await prisma.detailTrx.aggregate({
      _sum: { totalPrice: true },
      where: {
        transaction: { trxType: 'in', date: { gte: new Date(startDate), lte: new Date(endDate) } },
      },
    });

    // Laba/Rugi
    const profitLoss = (totalIncome._sum.totalPrice || 0) - (totalExpense._sum.totalPrice || 0);

    res.status(200).json({
      totalIncome: totalIncome._sum.totalPrice || 0,
      totalExpense: totalExpense._sum.totalPrice || 0,
      profitLoss,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch financial statistics' });
  }
};


module.exports = {
  getStockStatistics,
  getTransactionStatistics,
  getFinancialStatistics
};