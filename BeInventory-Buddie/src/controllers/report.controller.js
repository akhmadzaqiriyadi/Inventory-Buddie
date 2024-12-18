const prisma = require('../config/database');

// Laporan Stok Produk
const getStockReport = async (req, res) => {
  const { categoryId, rackId } = req.query;

  try {
    const filters = {};
    if (categoryId) filters.categoryId = parseInt(categoryId);
    if (rackId) filters.rackId = parseInt(rackId);

    const stockReport = await prisma.product.findMany({
      where: filters,
      select: {
        id: true,
        name: true,
        stock: true,
        category: { select: { name: true } },
        rack: { select: { location: true } },
      },
    });

    res.status(200).json(stockReport);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stock report' });
  }
};

// Laporan Transaksi
const getTransactionReport = async (req, res) => {
    const { trxType, startDate, endDate } = req.query;
  
    try {
      const filters = {};
      if (trxType) filters.trxType = trxType;
      if (startDate && endDate) {
        filters.date = {
          gte: new Date(startDate),
          lte: new Date(endDate),
        };
      }
  
      const transactionReport = await prisma.transaction.findMany({
        where: filters,
        include: {
          details: {
            select: {
              product: { select: { name: true } },
              qty: true,
            },
          },
        },
      });
  
      res.status(200).json(transactionReport);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transaction report' });
    }
};

// 
const getSalesAndPurchasesSummary = async (req, res) => {
    const { startDate, endDate } = req.query;

    try {
        // Validasi input tanggal
        if (!startDate || !endDate) {
            return res.status(400).json({ error: 'startDate and endDate are required' });
        }

        // Query untuk total penjualan (trxType = 'out')
        const totalSales = await prisma.detailTrx.aggregate({
            _sum: {
                qty: true,
                totalPrice: true,
            },
            where: {
                transaction: {
                    trxType: 'out',
                    date: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    },
                },
            },
        });

        // Query untuk total pembelian (trxType = 'in')
        const totalPurchases = await prisma.detailTrx.aggregate({
            _sum: {
                qty: true,
                totalPrice: true,
            },
            where: {
                transaction: {
                    trxType: 'in',
                    date: {
                        gte: new Date(startDate),
                        lte: new Date(endDate),
                    },
                },
            },
        });

        // Hitung selisih laba/rugi
        const profitLoss = (totalSales._sum.totalPrice || 0) - (totalPurchases._sum.totalPrice || 0);

        // Response data
        res.status(200).json({
            totalSales: totalSales._sum.totalPrice || 0,
            totalPurchases: totalPurchases._sum.totalPrice || 0,
            profitLoss,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate report' });
    }
};

module.exports = { getStockReport, getTransactionReport, getSalesAndPurchasesSummary };

  